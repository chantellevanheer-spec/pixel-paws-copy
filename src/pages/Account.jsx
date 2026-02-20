import React, { useState, useEffect } from "react";
import { User } from "@/entities/all";
import { UploadFile } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Image as ImageIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profile_picture_url: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        setFormData({
          username: currentUser.username || "",
          bio: currentUser.bio || "",
          profile_picture_url: currentUser.profile_picture_url || ""
        });
      } catch (error) {
        console.error("Failed to fetch user", error);
        setMessage({ type: "error", text: "Could not load your profile. Please try again." });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsSaving(true);
    try {
      const { file_url } = await UploadFile({ file });
      setFormData(prev => ({ ...prev, profile_picture_url: file_url }));
      setMessage({ type: "success", text: "Profile picture updated! Don't forget to save." });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to upload image." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      await User.updateMyUserData(formData);
      setMessage({ type: "success", text: "Profile saved successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save profile. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-purple)]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="header-font text-4xl md:text-5xl text-gray-800">Account Settings</h1>
        <p className="body-font-light text-lg text-gray-600 mt-2">Manage your profile details and preferences.</p>
      </header>

      {message && (
        <Alert className={`funky-card ${message.type === 'success' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'}`}>
          <AlertTitle className="header-font">{message.type === 'success' ? 'Success!' : 'Oops!'}</AlertTitle>
          <AlertDescription className="body-font">{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="funky-card p-8">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4 text-center">
            <div className="relative w-40 h-40 mx-auto">
              <img
                src={formData.profile_picture_url || `https://ui-avatars.com/api/?name=${user?.full_name || 'User'}&background=C3B1E1&color=5E3B85&size=160&font-size=0.5`}
                alt="Profile"
                className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg"
              />
              <label htmlFor="profile_picture" className="absolute bottom-1 right-1 funky-button bg-[var(--brand-pink)] p-2 cursor-pointer">
                <ImageIcon className="w-5 h-5 text-white" />
                <input id="profile_picture" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
            <h2 className="header-font text-2xl text-gray-800">{user?.full_name}</h2>
            <p className="body-font text-gray-500">{user?.email}</p>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="body-font text-gray-700">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                className="funky-button bg-white !text-gray-800"
                placeholder="e.g., BestPetParent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="body-font text-gray-700">Your Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="funky-button bg-white !text-gray-800 h-28"
                placeholder="Tell us about you and your pets!"
              />
            </div>
            <div>
              <Button type="submit" disabled={isSaving} className="funky-button bg-[var(--brand-purple)] text-white text-lg px-8 py-3">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5 mr-2" /> Save Changes</>}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}