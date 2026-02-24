'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { createProject, updateProject } from '@/lib/actions/projects'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/admin/image-upload'

interface Project {
  id: string
  title: string
  slug: string
  location: string
  room_type: string
  style: string
  image_url: string
  year: string
  duration: string
  sqft: string
  description: string
  services: string[]
  featured: boolean
}

interface ProjectFormProps {
  project?: Project
}

export function ProjectForm({ project }: ProjectFormProps) {
  const [imageUrl, setImageUrl] = useState(project?.image_url || '')
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error?: string } | null, formData: FormData) => {
      if (project) {
        return await updateProject(project.id, formData)
      }
      return await createProject(formData)
    },
    null
  )

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{state.error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={project?.title}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-neutral-700 mb-1">
            Slug *
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            pattern="[a-z0-9-]+"
            defaultValue={project?.slug}
            placeholder="modern-kitchen-design"
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p className="mt-1 text-xs text-neutral-500">Lowercase letters, numbers, and hyphens only</p>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
            Location *
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            defaultValue={project?.location}
            placeholder="Hyderabad, India"
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="room_type" className="block text-sm font-medium text-neutral-700 mb-1">
            Room Type *
          </label>
          <select
            id="room_type"
            name="room_type"
            required
            defaultValue={project?.room_type}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select type</option>
            <option value="Kitchens">Kitchens</option>
            <option value="Living Spaces">Living Spaces</option>
            <option value="Wardrobes">Wardrobes</option>
            <option value="Bedrooms">Bedrooms</option>
            <option value="Offices">Offices</option>
          </select>
        </div>

        <div>
          <label htmlFor="style" className="block text-sm font-medium text-neutral-700 mb-1">
            Style *
          </label>
          <select
            id="style"
            name="style"
            required
            defaultValue={project?.style}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select style</option>
            <option value="Modern">Modern</option>
            <option value="French">French</option>
            <option value="Luxury">Luxury</option>
            <option value="Smart">Smart</option>
            <option value="Traditional">Traditional</option>
          </select>
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-neutral-700 mb-1">
            Year *
          </label>
          <input
            id="year"
            name="year"
            type="text"
            required
            defaultValue={project?.year}
            placeholder="2024"
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-neutral-700 mb-1">
            Duration *
          </label>
          <input
            id="duration"
            name="duration"
            type="text"
            required
            defaultValue={project?.duration}
            placeholder="6 weeks"
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="sqft" className="block text-sm font-medium text-neutral-700 mb-1">
            Square Feet *
          </label>
          <input
            id="sqft"
            name="sqft"
            type="text"
            required
            defaultValue={project?.sqft}
            placeholder="2,500 sq ft"
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Project Image *
        </label>
        <ImageUpload
          name="image_url"
          value={imageUrl}
          onChange={setImageUrl}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={project?.description}
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="services" className="block text-sm font-medium text-neutral-700 mb-1">
          Services (comma-separated) *
        </label>
        <input
          id="services"
          name="services"
          type="text"
          required
          defaultValue={project?.services?.join(', ') ?? ''}
          placeholder="Interior Design, Space Planning, Custom Furniture"
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex items-center">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          value="true"
          defaultChecked={project?.featured}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
        />
        <label htmlFor="featured" className="ml-2 block text-sm text-neutral-700">
          Featured project (show on homepage)
        </label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  )
}
