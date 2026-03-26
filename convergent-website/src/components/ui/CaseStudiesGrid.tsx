'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CaseStudy } from '@/lib/sanity/types';
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
  material?: CaseStudy['material']
): Array<NonNullable<CaseStudy['material']>[number]> => {
  if (Array.isArray(material)) {
    return material;
  }
  if (material) {
    return [material as NonNullable<CaseStudy['material']>[number]];
  }
  return [];
};

type CaseStudiesGridProps = {
  caseStudies: CaseStudy[];
};

export default function CaseStudiesGrid({ caseStudies }: CaseStudiesGridProps) {
  const [selectedMaterials, setSelectedMaterials] = useState<
    Array<NonNullable<CaseStudy['material']>[number]>
  >([]);
  const [selectedProcess, setSelectedProcess] = useState('all');
  const [selectedChallenges, setSelectedChallenges] = useState<
    Array<NonNullable<CaseStudy['manufacturingChallenges']>[number]>
  >([]);

  const options = useMemo(() => {
    const materials = (Object.keys(materialLabels) as Array<
      NonNullable<CaseStudy['material']>[number]
    >).sort((a, b) => getLabel(a, materialLabels).localeCompare(getLabel(b, materialLabels)));
    const processes = Array.from(
      new Set(caseStudies.map((cs) => cs.process).filter(Boolean) as Array<NonNullable<CaseStudy['process']>>)
    ).sort((a, b) => getLabel(a, processLabels).localeCompare(getLabel(b, processLabels)));
    const challenges = Array.from(
      new Set(caseStudies.flatMap((cs) => cs.manufacturingChallenges || []))
    ).sort((a, b) => getLabel(a, challengeLabels).localeCompare(getLabel(b, challengeLabels)));

    return {
      materials,
      processes,
      challenges,
    };
  }, [caseStudies]);

  const filteredCaseStudies = useMemo(
    () =>
      caseStudies.filter((cs) => {
        if (selectedMaterials.length > 0) {
          const csMaterials = getMaterialList(cs.material);
          const matchesAll = selectedMaterials.every((material) => csMaterials.includes(material));
          if (!matchesAll) {
            return false;
          }
        }
        if (selectedProcess !== 'all' && cs.process !== selectedProcess) {
          return false;
        }
        if (selectedChallenges.length > 0) {
          const csChallenges = cs.manufacturingChallenges || [];
          const matchesAll = selectedChallenges.every((challenge) =>
            csChallenges.includes(challenge)
          );
          if (!matchesAll) {
            return false;
          }
        }
        return true;
      }),
    [caseStudies, selectedMaterials, selectedProcess, selectedChallenges]
  );

  const hasActiveFilters =
    selectedMaterials.length > 0 ||
    selectedProcess !== 'all' ||
    selectedChallenges.length > 0;

  const toggleMaterial = (value: NonNullable<CaseStudy['material']>[number]) => {
    setSelectedMaterials((prev) =>
      prev.includes(value) ? prev.filter((material) => material !== value) : [...prev, value]
    );
  };

  const toggleChallenge = (value: NonNullable<CaseStudy['manufacturingChallenges']>[number]) => {
    setSelectedChallenges((prev) =>
      prev.includes(value) ? prev.filter((challenge) => challenge !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedProcess('all');
    setSelectedChallenges([]);
  };

  return (
    <div>
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <div>
            <label htmlFor="case-filter-process" className="block text-sm font-medium text-gray-700 mb-1">
              Process
            </label>
            <select
              id="case-filter-process"
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
            Showing {filteredCaseStudies.length} of {caseStudies.length}
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

      {filteredCaseStudies.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-600">
          No case studies match the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCaseStudies.map((cs) => (
            <Link
              key={cs._id}
              href={`/projects/case-studies/${cs.slug.current}`}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Image hidden for now; keep mainImage in schema for later use. */}

              <div className="p-6">
                <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                  {cs.title}
                </h2>

                {cs.customer && (
                  <p className="mb-2 text-sm text-gray-500">
                    Customer: {cs.customer}
                  </p>
                )}

                {cs.summary && (
                  <p className="mb-4 line-clamp-3 text-gray-600">
                    {cs.summary}
                  </p>
                )}

                <div className="mb-2 flex flex-wrap gap-2">
                  {cs.process && (
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      {getLabel(cs.process, processLabels)}
                    </span>
                  )}
                  {getMaterialList(cs.material).map((material) => (
                    <span
                      key={material}
                      className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700"
                    >
                      {getLabel(material, materialLabels)}
                    </span>
                  ))}
                </div>

                {cs.manufacturingChallenges &&
                  cs.manufacturingChallenges.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {cs.manufacturingChallenges.map((challenge) => (
                        <span
                          key={challenge}
                          className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700"
                        >
                          {getLabel(challenge, challengeLabels)}
                        </span>
                      ))}
                    </div>
                  )}

                {cs.completedDate && (
                  <p className="mt-2 text-sm text-gray-500">
                    Completed: {new Date(cs.completedDate).toLocaleDateString()}
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
