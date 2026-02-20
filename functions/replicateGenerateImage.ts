import { createClientFromRequest } from 'npm:@base44/sdk@0.5.0';

// SDXL Model from Replicate
const SDXL_VERSION = "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";

Deno.serve(async (req) => {
    const base44 = createClientFromRequest(req);

    if (!(await base44.auth.isAuthenticated())) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { pet_name, pet_type, breed, style_name, style_description } = await req.json();

        if (!pet_name || !pet_type || !style_name || !style_description) {
            return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
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
        
        const breed_info = breed ? `${breed} ` : '';
        const prompt = `professional award-winning photograph of a cute ${breed_info}${pet_type} named ${pet_name}. ${style_description}, ${style_name} style, cinematic, dramatic lighting, high detail, vibrant colors`;
        const negative_prompt = "cartoon, drawing, sketch, deformed, disfigured, low quality, ugly, text, watermark, signature";

        const response = await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                version: SDXL_VERSION,
                input: {
                    prompt: prompt,
                    negative_prompt: negative_prompt,
                    width: 1024,
                    height: 1024,
                    refine: "expert_ensemble_refiner",
                    scheduler: "K_EULER",
                    guidance_scale: 7.5,
                    num_inference_steps: 50,
                }
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Replicate API error:`, errorBody);
            return new Response(JSON.stringify({ error: 'Failed to start Replicate prediction', details: errorBody }), { status: response.status });
        }

        const prediction = await response.json();
        
        let result = prediction;
        while (result.status !== 'succeeded' && result.status !== 'failed' && result.status !== 'canceled') {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
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
            return new Response(JSON.stringify({ 
                success: true,
                url: result.output[0],
                prompt_used: prompt
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            return new Response(JSON.stringify({ 
                error: 'Image generation failed or was canceled.',
                details: result.error || 'No output from Replicate.'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    } catch (error) {
        console.error('Error in replicateGenerateImage function:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to generate image',
            details: error.message 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
});