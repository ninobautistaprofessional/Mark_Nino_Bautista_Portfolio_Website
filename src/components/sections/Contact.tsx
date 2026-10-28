import { useState } from 'react'
import { Mail, Phone, Send } from 'lucide-react'
import { profile } from '../../data/profile'
import { submitContact } from '../../lib/api'
import type { ContactPayload } from '../../types'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Name is required.'
  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email)) errors.email = 'Enter a valid email.'
  if (!values.message.trim() || values.message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.'
  return errors
}

export function Contact() {
  const [values, setValues] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    if (values.website) return
    setStatus('submitting')
    const payload: ContactPayload = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim() || undefined,
      message: values.message.trim(),
    }
    const result = await submitContact(payload)
    if (result.ok) {
      setStatus('success')
      setFeedback(result.message)
      setValues({ name: '', email: '', subject: '', message: '', website: '' })
    } else {
      setStatus('error')
      setFeedback(result.message)
    }
  }

  return (
    <section id="contact" className="wrap py-16 scroll-mt-20">
      <div className="mb-7">
        <div className="text-accent font-bold tracking-[0.13em] uppercase text-xs">Let's connect</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight mt-2 mb-0">
          Looking for an IT professional?
        </h2>
        <p className="text-muted mt-3 max-w-xl m-0">I'm open to opportunities in {profile.openTo}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-b from-white/5 to-transparent bg-panel border border-line rounded-card p-6">
          <h3 className="mt-0 mb-4">Send a message</h3>
          <form onSubmit={onSubmit} noValidate className="space-y-4">
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input name="website" value={values.website} onChange={onChange} tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={values.name}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-xl bg-panel2 border border-line text-text focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {errors.name ? <p className="text-red-400 text-xs mt-1">{errors.name}</p> : null}
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-xl bg-panel2 border border-line text-text focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {errors.email ? <p className="text-red-400 text-xs mt-1">{errors.email}</p> : null}
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="subject">
                Subject (optional)
              </label>
              <input
                id="subject"
                name="subject"
                value={values.subject}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-xl bg-panel2 border border-line text-text focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-xl bg-panel2 border border-line text-text focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
              {errors.message ? <p className="text-red-400 text-xs mt-1">{errors.message}</p> : null}
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold bg-accent text-[#08201e] border border-accent hover:bg-[#9bf3e9] transition-colors disabled:opacity-60"
            >
              <Send size={16} /> {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'success' ? <p className="text-accent text-sm">{feedback}</p> : null}
            {status === 'error' ? <p className="text-red-400 text-sm">{feedback}</p> : null}
          </form>
        </div>
        <div className="bg-gradient-to-b from-white/5 to-transparent bg-panel border border-line rounded-card p-6 flex flex-col gap-4">
          <h3 className="mt-0 mb-2">Contact details</h3>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-accent hover:underline">
            <Mail size={16} /> {profile.email}
          </a>
          <a href={`tel:${profile.phoneTel}`} className="inline-flex items-center gap-2 text-accent hover:underline">
            <Phone size={16} /> {profile.phone}
          </a>
          <p className="text-muted text-sm m-0 mt-2">
            Email: {profile.email} · Phone: {profile.phone}
          </p>
        </div>
      </div>
    </section>
  )
}