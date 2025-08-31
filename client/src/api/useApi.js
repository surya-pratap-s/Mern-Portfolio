import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem("token");
const defaultHeaders = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), };

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
            setProfile(data.basicDetails);
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
                headers: token ? { Authorization: `Bearer ${token}` } : {}, // 👈 FormData me content-type auto set hota hai
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
                headers: defaultHeaders,
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
                headers: defaultHeaders,
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
                headers: defaultHeaders,
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
                headers: defaultHeaders,
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

export const useAcademicsApi = () => {
    const [academics, setAcademics] = useState([]);
    const [loadingAcademics, setLoading] = useState(false);

    // Fetch all academics
    const fetchAcademics = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/academics`);
            const data = await res.json();
            setAcademics(data);
        } catch (err) {
            console.error("Error fetching academics", err);
        } finally {
            setLoading(false);
        }
    };

    // Add academic
    const addAcademic = async (academic) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/academics`, {
                method: "POST",
                headers: defaultHeaders,
                body: JSON.stringify(academic),
            });
            const data = await res.json();
            setAcademics((prev) => [...prev, data]);
        } catch {
            console.error("Error adding academic");
        } finally {
            setLoading(false);
        }
    };

    // Update academic
    const updateAcademic = async (id, academic) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/academics/${id}`, {
                method: "PUT",
                headers: defaultHeaders,
                body: JSON.stringify(academic),
            });
            const data = await res.json();
            setAcademics((prev) => prev.map((item) => (item._id === id ? data : item)));
        } catch {
            console.error("Error updating academic");
        } finally {
            setLoading(false);
        }
    };

    // Delete academic
    const deleteAcademic = async (id) => {
        try {
            setLoading(true);
            await fetch(`${API_BASE_URL}/academics/${id}`, {
                method: "DELETE",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            setAcademics((prev) => prev.filter((item) => item._id !== id));
        } catch {
            console.error("Error deleting academic");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAcademics();
    }, []);

    return { academics, loadingAcademics, fetchAcademics, addAcademic, updateAcademic, deleteAcademic };
}

export const useProjectsApi = () => {
    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoading] = useState(false);

    // Fetch all projects
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/projects`);
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error("Error fetching Projects", err);
        } finally {
            setLoading(false);
        }
    };

    // Add projects
    const addProject = async (project) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/projects`, {
                method: "POST",
                headers: defaultHeaders,
                body: JSON.stringify(project),
            });
            const data = await res.json();
            setProjects((prev) => [...prev, data]);
        } catch {
            console.error("Error adding Project");
        } finally {
            setLoading(false);
        }
    };

    // Update projects
    const updateProject = async (id, project) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
                method: "PUT",
                headers: defaultHeaders,
                body: JSON.stringify(project),
            });
            const data = await res.json();
            setProjects((prev) => prev.map((item) => (item._id === id ? data : item)));
        } catch {
            console.error("Error updating Project");
        } finally {
            setLoading(false);
        }
    };

    // Delete Project
    const deleteProject = async (id) => {
        try {
            setLoading(true);
            await fetch(`${API_BASE_URL}/projects/${id}`, {
                method: "DELETE",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            setProjects((prev) => prev.filter((item) => item._id !== id));
        } catch {
            console.error("Error deleting Project");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return { projects, loadingProjects, fetchProjects, addProject, updateProject, deleteProject };
}

export const useExpriencesApi = () => {
    const [experiences, setExperiences] = useState([]);
    const [loadingExperiences, setLoading] = useState(false);

    // Fetch all Experiences
    const fetchExperiences = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/experiences`);
            const data = await res.json();
            setExperiences(data);
        } catch (err) {
            console.error("Error fetching Experiences", err);
        } finally {
            setLoading(false);
        }
    };

    // Add Experience
    const addExperience = async (experiences) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/experiences`, {
                method: "POST",
                headers: defaultHeaders,
                body: JSON.stringify(experiences),
            });
            const data = await res.json();
            setExperiences((prev) => [...prev, data]);
        } catch {
            console.error("Error adding Experience");
        } finally {
            setLoading(false);
        }
    };

    // Update Experiences
    const updateExperience = async (id, project) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/experiences/${id}`, {
                method: "PUT",
                headers: defaultHeaders,
                body: JSON.stringify(project),
            });
            const data = await res.json();
            setExperiences((prev) => prev.map((item) => (item._id === id ? data : item)));
        } catch {
            console.error("Error updating Experiences");
        } finally {
            setLoading(false);
        }
    };

    // Delete Experiences
    const deleteExperience = async (id) => {
        try {
            setLoading(true);
            await fetch(`${API_BASE_URL}/experiences/${id}`, {
                method: "DELETE",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            setExperiences((prev) => prev.filter((item) => item._id !== id));
        } catch {
            console.error("Error deleting Experiences");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    return { experiences, loadingExperiences, fetchExperiences, addExperience, updateExperience, deleteExperience };
}

export const useCertificatesApi = () => {
    const [certificates, setCertificates] = useState([]);
    const [loadingCertificates, setLoading] = useState(false);

    // Fetch all Certificates
    const fetchCertificates = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/certificates`);
            const data = await res.json();
            setCertificates(data);
        } catch (err) {
            console.error("Error fetching certificates", err);
        } finally {
            setLoading(false);
        }
    };

    // Add Certificates
    const addCertificates = async (certificates) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/certificates`, {
                method: "POST",
                headers: defaultHeaders,
                body: JSON.stringify(certificates),
            });
            const data = await res.json();
            setCertificates((prev) => [...prev, data]);
        } catch {
            console.error("Error adding certificates");
        } finally {
            setLoading(false);
        }
    };

    // Update Certificates
    const updateCertificates = async (id, project) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/certificates/${id}`, {
                method: "PUT",
                headers: defaultHeaders,
                body: JSON.stringify(project),
            });
            const data = await res.json();
            setCertificates((prev) => prev.map((item) => (item._id === id ? data : item)));
        } catch {
            console.error("Error updating Certificates");
        } finally {
            setLoading(false);
        }
    };

    // Delete Certificates
    const deleteCertificates = async (id) => {
        try {
            setLoading(true);
            await fetch(`${API_BASE_URL}/certificates/${id}`, {
                method: "DELETE",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            setCertificates((prev) => prev.filter((item) => item._id !== id));
        } catch {
            console.error("Error deleting Certificates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    return { certificates, loadingCertificates, fetchCertificates, addCertificates, updateCertificates, deleteCertificates };
}
