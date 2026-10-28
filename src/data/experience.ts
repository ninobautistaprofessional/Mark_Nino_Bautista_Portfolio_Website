import type { ExperienceItem, EducationItem, QuickStat } from '../types'

export const experience: ExperienceItem = {
  role: 'IT Administrator',
  company: 'Lake Shore Educational Institution',
  duration: '3 years of professional experience',
  techSupport: [
    'Support administrative personnel and faculty.',
    'Install and configure Windows 10/11.',
    'Troubleshoot hardware, software, applications, and peripherals.',
    'Document issues and assist users with technical concerns.',
  ],
  infrastructure: [
    'Administer 800+ Google Workspace accounts.',
    'Troubleshoot LAN/WAN and TCP/IP connectivity.',
    'Support access points, IP management, cabling, and ISP coordination.',
    'Assist with CCTV operations and institutional website maintenance.',
  ],
}

export const education: EducationItem = {
  degree: 'Bachelor of Science in Information Technology',
  school: 'STI College Carmona',
  note: 'Academic background supporting my professional work in IT operations, systems, networking, and web technologies.',
}

export const quickStats: QuickStat[] = [
  { value: '3 yrs', label: 'IT experience' },
  { value: '800+', label: 'Workspace accounts' },
  { value: '3', label: 'Featured web projects' },
]