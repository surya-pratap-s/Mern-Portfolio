import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useProfileApi = () => {
    const [profile, setProfile] = useState(null);

    // Loading states for each operation
    const [loadingProfile, setLoading] = useState({
        fetchProfile: false,
        saveProfile: false,
        addSkill: false,
        removeSkill: false,
        addSocialLink: false,
        removeSocialLink: false,
    });

    const setLoadingState = (key, value) => {
        setLoading((prev) => ({ ...prev, [key]: value }));
    };

    // Fetch profile
    const fetchProfile = async () => {
        try {
            setLoadingState("fetchProfile", true);
            const res = await fetch(`${API_BASE_URL}/profile`);
            const data = await res.json();
            setProfile(data.profile);
        } catch (err) {
            console.error(err.message || "Error fetching profile");
        } finally {
            setLoadingState("fetchProfile", false);
        }
    };

    // Save profile
    const saveProfile = async (formData) => {
        try {
            setLoadingState("saveProfile", true);
            const res = await fetch(`${API_BASE_URL}/profile/save`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) setProfile(data.profile);
            return data;
        } catch (err) {
            console.error(err.message || "Error saving profile");
        } finally {
            setLoadingState("saveProfile", false);
        }
    };

    // Add skill
    const addSkill = async (skill) => {
        try {
            setLoadingState("addSkill", true);
            const res = await fetch(`${API_BASE_URL}/profile/skill/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skill }),
            });
            const data = await res.json();
            setProfile((prev) => ({ ...prev, skills: data }));
        } catch (err) {
            console.error(err.message || "Error adding skill");
        } finally {
            setLoadingState("addSkill", false);
        }
    };

    // Remove skill
    const removeSkill = async (index) => {
        try {
            setLoadingState("removeSkill", true);
            const res = await fetch(`${API_BASE_URL}/profile/skill/remove`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ index }),
            });
            const data = await res.json();
            setProfile((prev) => ({ ...prev, skills: data }));
        } catch (err) {
            console.error(err.message || "Error removing skill");
        } finally {
            setLoadingState("removeSkill", false);
        }
    };

    // Add social link
    const addSocialLink = async (title, url) => {
        try {
            setLoadingState("addSocialLink", true);
            const res = await fetch(`${API_BASE_URL}/profile/social/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, url }),
            });
            const data = await res.json();
            setProfile((prev) => ({ ...prev, socialLinks: data }));
        } catch (err) {
            console.error(err.message || "Error adding social link");
        } finally {
            setLoadingState("addSocialLink", false);
        }
    };

    // Remove social link
    const removeSocialLink = async (index) => {
        try {
            setLoadingState("removeSocialLink", true);
            const res = await fetch(`${API_BASE_URL}/profile/social/remove`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ index }),
            });
            const data = await res.json();
            setProfile((prev) => ({ ...prev, socialLinks: data }));
        } catch (err) {
            console.error(err.message || "Error removing social link");
        } finally {
            setLoadingState("removeSocialLink", false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return {
        loadingProfile,
        profile,
        fetchProfile,
        saveProfile,
        addSkill,
        removeSkill,
        addSocialLink,
        removeSocialLink,
    };
};
