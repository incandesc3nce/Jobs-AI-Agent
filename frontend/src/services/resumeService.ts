import { ResumeFormState } from "../pages/JobSearchPage"; // Assuming types are here

const API_BASE_URL = "https://jobs-agent-backend-2.loca.lt/api"; // Adjust if your backend URL is different

// Define Resume interface based on actual backend response
export interface Resume {
  id: string;
  userId: string;
  title: string;
  skills: string[]; // Changed from string to string[]
  experience: string;
  location: string;
  workFormat: "Remote" | "Hybrid" | "Onsite" | ""; // Ensure this matches backend
  createdAt: string;
  updatedAt: string;
}

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "PostmanRuntime/7.43.4",
    "bypass-tunnel-reminder": "true",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    // Log a warning. The API call will likely fail with 401 if auth is required,
    // which should be handled by the calling function.
    console.warn(
      "No token found in localStorage for getAuthHeaders. Request will likely fail authentication if auth is required."
    );
  }
  return headers;
};

// Helper function to handle API errors
const handleApiError = async (
  response: Response,
  defaultErrorMessage: string
): Promise<Error> => {
  let errorMessage = defaultErrorMessage;
  try {
    const errorData = await response.json();
    if (errorData && errorData.message) {
      errorMessage = errorData.message;
    } else if (typeof errorData === "string") {
      errorMessage = errorData;
    } else if (errorData && Object.keys(errorData).length > 0) {
      errorMessage = JSON.stringify(errorData);
    } else {
      const textError = await response.text();
      if (textError) {
        errorMessage = textError;
      } else {
        errorMessage = `${defaultErrorMessage}. Status: ${response.status} ${
          response.statusText || ""
        }`.trim();
      }
    }
  } catch (jsonError) {
    try {
      const textError = await response.text();
      if (textError) {
        errorMessage = textError;
      } else {
        errorMessage = `${defaultErrorMessage}. Status: ${response.status} ${
          response.statusText || ""
        }`.trim();
      }
    } catch (textParseError) {
      errorMessage = `${defaultErrorMessage}. Status: ${response.status} ${
        response.statusText || ""
      }`.trim();
      console.error(
        "Failed to parse error response body as JSON or text",
        textParseError
      );
    }
  }
  return new Error(errorMessage);
};

export const resumeService = {
  getUserResumes: async (): Promise<Resume[]> => {
    const response = await fetch(`${API_BASE_URL}/users/resumes`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw await handleApiError(response, "Failed to fetch resumes");
    }
    const data = await response.json();
    // Assuming the backend wraps the array in a 'resumes' property based on user's log
    if (data && Array.isArray(data.resumes)) {
      return data.resumes as Resume[];
    }
    // Fallback or error if structure is not as expected
    // If data itself is the array (less likely given user log)
    if (Array.isArray(data)) {
      return data as Resume[];
    }
    console.error("Unexpected response structure for user resumes:", data);
    throw new Error("Unexpected response structure for user resumes");
  },

  createResume: async (resumeData: ResumeFormState): Promise<Resume> => {
    const payload = {
      ...resumeData,
      skills: resumeData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    };
    const response = await fetch(`${API_BASE_URL}/resumes/create`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw await handleApiError(response, "Failed to create resume");
    }
    return response.json(); // Expecting a single Resume object
  },

  updateResume: async (
    resumeId: string,
    resumeData: Partial<ResumeFormState>
  ): Promise<Resume> => {
    const payload: any = { ...resumeData };
    if (typeof resumeData.skills === "string") {
      payload.skills = resumeData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    }

    const body = { resumeId, ...payload };

    const response = await fetch(`${API_BASE_URL}/resumes/update`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw await handleApiError(response, "Failed to update resume");
    }
    return response.json(); // Expecting a single Resume object
  },

  deleteResume: async (resumeId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/resumes/delete`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({ resumeId }),
    });
    if (!response.ok) {
      throw await handleApiError(response, "Failed to delete resume");
    }
    return response.json();
  },
};
