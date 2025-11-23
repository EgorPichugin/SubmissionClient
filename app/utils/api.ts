export interface Submission {
  id: string;
  formName: string;
  datetime: string;
  data: string;
}

const API_BASE = 'http://localhost:5203/api/submissions';

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
    const res = await fetch(API_BASE);
    const json = await res.json();
    if (!Array.isArray(json)) return [];
    return json.map(normalizeRawSubmission);
  },

  async createSubmission(payload: any): Promise<Submission> {
    const res = await fetch(API_BASE, {
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
    await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
  });
}
};