import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'lakeshore-website',
    title: 'Lake Shore Colleges Website',
    tag: 'Public website',
    description:
      'A public-facing institutional website for academic program information, admissions guidance, announcements, and campus information.',
    iconLabel: '01 / WEB',
    skills: ['Website maintenance', 'Content updates', 'Digital communications'],
    liveUrl: 'https://lakeshore.education/',
    contributionNote:
      'My related experience: institutional website maintenance and content/interface improvements. Confirm specific contributions before publishing this as a development credit.',
  },
  {
    id: 'guest-ticketing',
    title: 'Guest Ticketing System',
    tag: 'Operational web service',
    description:
      'A dedicated web interface identified as a Guest Ticketing System, separate from the institution\u2019s public-facing website.',
    iconLabel: '02 / TICKET',
    skills: ['Web application support', 'UI maintenance', 'Troubleshooting'],
    liveUrl: 'https://ticketing.lakeshore.education/',
    contributionNote:
      'Project description is based on the public system identity. Add workflow details and your individual contribution once confirmed.',
  },
  {
    id: 'creatives-job-order',
    title: 'Creatives Role-Based Job Order',
    tag: 'Role-based application',
    description:
      'A dedicated role-based job order application associated with the institution\u2019s operational workflow.',
    iconLabel: '03 / JOB ORDER',
    skills: ['Application support', 'Workflow concepts', 'Documentation'],
    liveUrl: 'https://joborder.lakeshore.education/',
    contributionNote:
      'Specific features and implementation details should be added only if verified and part of your work.',
  },
]