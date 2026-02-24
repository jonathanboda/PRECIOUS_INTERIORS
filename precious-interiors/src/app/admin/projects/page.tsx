import Link from 'next/link'
import Image from 'next/image'
import { getProjects } from '@/lib/queries/projects'
import { DeleteProjectButton } from '@/components/admin/delete-project-button'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-neutral-900">
            Projects
          </h1>
          <p className="text-neutral-600 mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Type / Style
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-16 relative flex-shrink-0 bg-neutral-100 rounded overflow-hidden">
                      <Image
                        src={project.image_url || '/images/placeholder.jpg'}
                        alt={project.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900">
                        {project.title}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {project.year} • {project.sqft}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">{project.room_type}</div>
                  <div className="text-sm text-neutral-500">{project.style}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                  {project.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.featured ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Featured
                    </span>
                  ) : (
                    <span className="text-sm text-neutral-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="text-neutral-600 hover:text-neutral-900"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    Edit
                  </Link>
                  <DeleteProjectButton id={project.id} />
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                  No projects yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
