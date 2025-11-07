export interface HealthEducationMessage {
  id?: number;
  serverId?: string;
  title: string;
  content: string;
  category: 'hypertension' | 'diabetes' | 'general';
  language: 'en' | 'tw' | 'ga';
  mediaUrl?: string; // for video/audio content
  createdAt: number;
}
