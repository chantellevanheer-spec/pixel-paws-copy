import { createClientFromRequest } from 'npm:@base44/sdk@0.5.0';

Deno.serve(async (req) => {
    const base44 = createClientFromRequest(req);

    if (!(await base44.auth.isAuthenticated())) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { image_url, prompt, num_variations = 3, strength = 0.5 } = await req.json();

        if (!image_url || !prompt) {
            return new Response(JSON.stringify({ error: 'Missing required parameters: image_url and prompt' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const REPLICATE_API_TOKEN = Deno.env.get("REPLICATE_API_TOKEN");
        if (!REPLICATE_API_TOKEN) {
            return new Response(JSON.stringify({ error: 'Replicate API token not configured' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Generate multiple variations
        const variations = [];
        
        for (let i = 0; i < num_variations; i++) {
            const response = await fetch('https://api.replicate.com/v1/predictions', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${REPLICATE_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    version: "be04660a5b93ef2aff61e3668dedb4cbeb14941e62a3fd5998364a32d613e35e", // stable-diffusion img2img
                    input: {
                        image: image_url,
                        prompt: prompt,
                        strength: strength, // How much to change the image (0.1 = subtle, 0.9 = major changes)
                        guidance_scale: 7.5,
                        num_inference_steps: 50,
                        scheduler: "DPMSolverMultistep"
                    }
                })
            });

            if (!response.ok) {
                console.error(`Replicate API error for variation ${i + 1}:`, await response.text());
                continue;
            }

            const prediction = await response.json();
            
            // Poll for completion
            let result = prediction;
            while (result.status !== 'succeeded' && result.status !== 'failed') {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
                    headers: {
                        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
                    }
                });
                
                if (pollResponse.ok) {
                    result = await pollResponse.json();
                } else {
                    break;
                }
            }

            if (result.status === 'succeeded' && result.output && result.output.length > 0) {
                variations.push({
                    url: result.output[0],
                    variation_index: i + 1
                });
            }
        }

        return new Response(JSON.stringify({ 
            success: true,
            variations: variations,
            total_generated: variations.length
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error generating variations:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to generate variations',
            details: error.message 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
});