'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/sanity/types';
import { urlFor } from '@/lib/sanity/image';

const processLabels: Record<string, string> = {
  'heat-blanket': 'Heat Blanket',
  'autoclave': 'Autoclave',
  'closed-mold': 'Closed Mold',
  'afp': 'AFP',
  'infusion': 'Infusion',
  'bonding': 'Bonding',
};
const materialLabels: Record<string, string> = {
  'thermoset': 'Thermoset',
  'thermoplastic': 'Thermoplastic',
  'bmi': 'BMI',
  'carbon-carbon': 'Carbon-Carbon',
  'polyimide': 'Polyimide',
};
const statusLabels: Record<string, string> = {
  'completed': 'Completed',
  'in-progress': 'In Progress',
};
const challengeLabels: Record<string, string> = {
  'thermal-compliance': 'Thermal Compliance',
  'distortion': 'Distortion',
  'offgassing': 'Offgassing',
  'part-thickness': 'Part Thickness',
  'porosity': 'Porosity',
  'wrinkling': 'Wrinkling',
  'tool-compensation': 'Tool Compensation',
};

const getLabel = (value: string, map: Record<string, string>) => map[value] || value;
const getMaterialList = (
  material?: Project['material']
): Array<NonNullable<Project['material']>[number]> => {
  if (Array.isArray(material)) {
    return material;
  }
  if (material) {
    return [material as NonNullable<Project['material']>[number]];
  }
  return [];
};

type ProjectsGridProps = {
  projects: Project[];
};

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selectedMaterials, setSelectedMaterials] = useState<
    Array<NonNullable<Project['material']>[number]>
  >([]);
  const [selectedCustomer, setSelectedCustomer] = useState('all');
  const [selectedProcess, setSelectedProcess] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  const options = useMemo(() => {
    const materials = Array.from(
      new Set(
        projects.flatMap(
          (project) => getMaterialList(project.material)
        )
      )
    ).sort((a, b) => getLabel(a, materialLabels).localeCompare(getLabel(b, materialLabels)));
    const customers = Array.from(
      new Set(projects.map((project) => project.customer).filter(Boolean) as string[])
    ).sort((a, b) => a.localeCompare(b));
    const processes = Array.from(
      new Set(projects.map((project) => project.process).filter(Boolean) as string[])
    ).sort((a, b) => getLabel(a, processLabels).localeCompare(getLabel(b, processLabels)));
    const statuses = Array.from(
      new Set(projects.map((project) => project.status).filter(Boolean) as string[])
    ).sort((a, b) => getLabel(a, statusLabels).localeCompare(getLabel(b, statusLabels)));
    const challenges = Array.from(
      new Set(
        projects.flatMap((project) => project.manufacturingChallenges || [])
      )
    ).sort((a, b) => getLabel(a, challengeLabels).localeCompare(getLabel(b, challengeLabels)));

    return {
      materials,
      customers,
      processes,
      statuses,
      challenges,
    };
  }, [projects]);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        if (selectedMaterials.length > 0) {
          const projectMaterials = getMaterialList(project.material);
          const matchesAll = selectedMaterials.every((material) =>
            projectMaterials.includes(material)
          );
          if (!matchesAll) {
            return false;
          }
        }
        if (selectedCustomer !== 'all' && project.customer !== selectedCustomer) {
          return false;
        }
        if (selectedProcess !== 'all' && project.process !== selectedProcess) {
          return false;
        }
        if (selectedStatus !== 'all' && project.status !== selectedStatus) {
          return false;
        }
        if (selectedChallenges.length > 0) {
          const projectChallenges = project.manufacturingChallenges || [];
          const matchesAll = selectedChallenges.every((challenge) =>
            projectChallenges.includes(challenge)
          );
          if (!matchesAll) {
            return false;
          }
        }
        return true;
      }),
    [
      projects,
      selectedMaterials,
      selectedCustomer,
      selectedProcess,
      selectedStatus,
      selectedChallenges,
    ]
  );

  const hasActiveFilters =
    selectedMaterials.length > 0 ||
    selectedCustomer !== 'all' ||
    selectedProcess !== 'all' ||
    selectedStatus !== 'all' ||
    selectedChallenges.length > 0;

  const toggleMaterial = (value: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(value) ? prev.filter((material) => material !== value) : [...prev, value]
    );
  };

  const toggleChallenge = (value: string) => {
    setSelectedChallenges((prev) =>
      prev.includes(value) ? prev.filter((challenge) => challenge !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedCustomer('all');
    setSelectedProcess('all');
    setSelectedStatus('all');
    setSelectedChallenges([]);
  };

  return (
    <div>
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
          <div>
            <label htmlFor="filter-customer" className="block text-sm font-medium text-gray-700 mb-1">
              Customer
            </label>
            <select
              id="filter-customer"
              value={selectedCustomer}
              onChange={(event) => setSelectedCustomer(event.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All customers</option>
              {options.customers.map((customer) => (
                <option key={customer} value={customer}>
                  {customer}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-process" className="block text-sm font-medium text-gray-700 mb-1">
              Process
            </label>
            <select
              id="filter-process"
              value={selectedProcess}
              onChange={(event) => setSelectedProcess(event.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All processes</option>
              {options.processes.map((process) => (
                <option key={process} value={process}>
                  {getLabel(process, processLabels)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="filter-status"
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All statuses</option>
              {options.statuses.map((status) => (
                <option key={status} value={status}>
                  {getLabel(status, statusLabels)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {options.materials.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Materials</p>
            <div className="flex flex-wrap gap-2">
              {options.materials.map((material) => {
                const isSelected = selectedMaterials.includes(material);
                return (
                  <button
                    key={material}
                    type="button"
                    onClick={() => toggleMaterial(material)}
                    className={`rounded-full px-3 py-1 text-sm transition-colors ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {getLabel(material, materialLabels)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {options.challenges.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Manufacturing Challenges</p>
            <div className="flex flex-wrap gap-2">
              {options.challenges.map((challenge) => {
                const isSelected = selectedChallenges.includes(challenge);
                return (
                  <button
                    key={challenge}
                    type="button"
                    onClick={() => toggleChallenge(challenge)}
                    className={`rounded-full px-3 py-1 text-sm transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {getLabel(challenge, challengeLabels)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredProjects.length} of {projects.length}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-600">
          No projects match the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {project.mainImage ? (
                <div className="relative h-48 w-full bg-gray-200">
                  <Image
                    src={urlFor(project.mainImage).width(600).height(400).url()}
                    alt={project.title}
                    fill
                    className="object-scale-down transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-gray-200">
                  <span className="text-gray-400">No image</span>
                </div>
              )}

              <div className="p-6">
                <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                  {project.title}
                </h2>

                {project.customer && (
                  <p className="mb-2 text-sm text-gray-500">
                    Customer: {project.customer}
                  </p>
                )}

                {project.status && (
                  <p className="mb-2 text-sm text-gray-500">
                    Status: {getLabel(project.status, statusLabels)}
                  </p>
                )}

                {project.description && (
                  <p className="mb-4 line-clamp-3 text-gray-600">
                    {project.description}
                  </p>
                )}

                <div className="mb-2 flex flex-wrap gap-2">
                  {project.process && (
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      {getLabel(project.process, processLabels)}
                    </span>
                  )}
                  {getMaterialList(project.material).map((material) => (
                      <span
                        key={material}
                        className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700"
                      >
                        {getLabel(material, materialLabels)}
                      </span>
                    ))}
                  {project.industry && (
                    <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                      {project.industry}
                    </span>
                  )}
                </div>

                {project.manufacturingChallenges &&
                  project.manufacturingChallenges.length > 0 && (
                    <p className="mt-2 text-sm text-gray-500">
                      Challenges:{' '}
                      {project.manufacturingChallenges
                        .map((challenge) => getLabel(challenge, challengeLabels))
                        .join(', ')}
                    </p>
                  )}

                {project.completedDate && (
                  <p className="mt-2 text-sm text-gray-500">
                    Completed: {new Date(project.completedDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
