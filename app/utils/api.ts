export interface Submission {
  id: string;
  formName: string;
  datetime: string;
  data: string;
}

function normalizeRawSubmission(r: any): Submission {
  const id = r.id ?? r.Id;
  const formName = r.formName ?? r.FormName ?? '';
  const datetime = r.createdAt ?? r.CreatedAt ?? r.datetime ?? r.DateTime ?? '';
  const rawData = r.data ?? r.Data ?? null;
  const data = typeof rawData === 'string' ? rawData : JSON.stringify(rawData);
  return { id, formName, datetime, data };
}

export const api = {
  async getAllSubmissions(): Promise<Submission[]> {
    const API_BASE = useRuntimeConfig().public.API_BASE;

    const res = await fetch(`${API_BASE}/api/Submissions`);
    const json = await res.json();
    if (!Array.isArray(json)) return [];
    return json.map(normalizeRawSubmission);
  },

  async createSubmission(payload: any): Promise<Submission> {
    const API_BASE = useRuntimeConfig().public.API_BASE;

    const res = await fetch(`${API_BASE}/api/Submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    return normalizeRawSubmission(json);
  },
  async deleteSubmission(id: string): Promise<void> {
    const API_BASE = useRuntimeConfig().public.API_BASE;
    
    await fetch(`${API_BASE}/api/Submissions/${id}`, {
      method: 'DELETE'
  });
}
};