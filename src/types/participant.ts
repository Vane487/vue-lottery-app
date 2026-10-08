export interface Participant {
  id: string
  name: string
  birthDate: string
  email: string
  phone: string
}

export type ParticipantDraft = Omit<Participant, 'id'>

export type FormErrors = Partial<Record<keyof ParticipantDraft, string>>

export type SortField = 'name' | 'birthDate' | null
export type SortDirection = 'asc' | 'desc'
