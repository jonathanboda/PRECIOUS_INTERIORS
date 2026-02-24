import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectById } from '@/lib/queries/projects'
import { ProjectForm } from '@/components/admin/forms/project-form'
import { ArrowLeft } from 'lucide-react'

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Projects
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">
          Edit Project: {project.title}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <ProjectForm project={project} />
      </div>
    </div>
  )
}
