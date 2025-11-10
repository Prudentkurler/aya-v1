import type { TutorialStep } from "@/components/dashboard/tutorial-overlay";

export const PATIENT_TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: "Welcome to Your Health Dashboard",
    description: "This is your personal health tracking center. You can monitor your blood pressure, glucose levels, and medications all in one place. Everything works offline, so you can use it anywhere.",
    audioText: "Welcome to your health dashboard! This is your personal health tracking center. You can monitor your blood pressure, glucose levels, and medications all in one place. Everything works offline, so you can use it anywhere."
  },
  {
    title: "Track Your Health Metrics",
    description: "The three cards at the top show your latest blood pressure, glucose readings, and medication adherence. These update automatically when you log new measurements.",
    audioText: "The three cards at the top show your latest blood pressure, glucose readings, and medication adherence. These update automatically when you log new measurements."
  },
  {
    title: "Quick Actions",
    description: "Use the Quick Actions section to easily log your blood pressure, record glucose levels, or mark medications as taken. Just click the button and enter your information.",
    audioText: "Use the Quick Actions section to easily log your blood pressure, record glucose levels, or mark medications as taken. Just click the button and enter your information."
  },
  {
    title: "Stay on Schedule",
    description: "The Upcoming section shows your doctor appointments and medication reminders. You'll never miss an important health task!",
    audioText: "The Upcoming section shows your doctor appointments and medication reminders. You'll never miss an important health task!"
  }
];

export const CHW_TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: "Welcome Community Health Worker",
    description: "Your dashboard helps you manage all patients in your community. You can track screenings, follow-ups, and critical alerts all in one place.",
    audioText: "Welcome Community Health Worker! Your dashboard helps you manage all patients in your community. You can track screenings, follow-ups, and critical alerts all in one place."
  },
  {
    title: "Community Overview",
    description: "The four metric cards show your total patients, screenings completed, follow-ups due, and active alerts. These numbers update in real-time.",
    audioText: "The four metric cards show your total patients, screenings completed, follow-ups due, and active alerts. These numbers update in real-time."
  },
  {
    title: "Patient Priority List",
    description: "Patients needing attention are listed with their latest readings and risk levels. Critical patients are marked in red, so you can help them first.",
    audioText: "Patients needing attention are listed with their latest readings and risk levels. Critical patients are marked in red, so you can help them first."
  },
  {
    title: "Your Daily Schedule",
    description: "Today's Schedule shows your planned visits, screenings, and health education sessions. Check items off as you complete them throughout the day.",
    audioText: "Today's Schedule shows your planned visits, screenings, and health education sessions. Check items off as you complete them throughout the day."
  }
];

export const CLINICIAN_TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: "Welcome to Clinical Dashboard",
    description: "Your physician dashboard provides a complete view of all patients under your care, including referrals from community health workers and critical alerts.",
    audioText: "Welcome to your clinical dashboard! This provides a complete view of all patients under your care, including referrals from community health workers and critical alerts."
  },
  {
    title: "Clinical Metrics",
    description: "The overview shows your active patients, critical alerts requiring urgent review, cases you've resolved, and pending reports. All data syncs automatically.",
    audioText: "The overview shows your active patients, critical alerts requiring urgent review, cases you've resolved, and pending reports. All data syncs automatically."
  },
  {
    title: "Patient Case Management",
    description: "Each patient case displays their MRN number, diagnosis, vital signs, and clinical notes. Click on any patient to see their complete medical history.",
    audioText: "Each patient case displays their M R N number, diagnosis, vital signs, and clinical notes. Click on any patient to see their complete medical history."
  },
  {
    title: "Clinical Schedule",
    description: "Your schedule shows ward rounds, outpatient clinics, critical reviews, and team meetings. Everything is organized to help you provide the best care.",
    audioText: "Your schedule shows ward rounds, outpatient clinics, critical reviews, and team meetings. Everything is organized to help you provide the best care."
  }
];

export const FAMILY_TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: "Welcome Family Health Champion",
    description: "As a Family Health Champion, you're helping your entire compound stay healthy. This dashboard shows the health status of all family members with hypertension.",
    audioText: "Welcome Family Health Champion! You're helping your entire compound stay healthy. This dashboard shows the health status of all family members with hypertension."
  },
  {
    title: "Compound Health Metrics",
    description: "See how many family members have their blood pressure under control, average medication adherence, and any critical alerts that need attention.",
    audioText: "See how many family members have their blood pressure under control, average medication adherence, and any critical alerts that need attention."
  },
  {
    title: "Family Member Tracking",
    description: "Each family member's card shows their latest blood pressure reading, medication adherence, and when they last checked in. Green means good, red means they need help.",
    audioText: "Each family member's card shows their latest blood pressure reading, medication adherence, and when they last checked in. Green means good, red means they need help."
  },
  {
    title: "Supporting Your Family",
    description: "You can send reminders, share health tips, and celebrate achievements together. Your support makes a real difference in your family's health!",
    audioText: "You can send reminders, share health tips, and celebrate achievements together. Your support makes a real difference in your family's health!"
  }
];
