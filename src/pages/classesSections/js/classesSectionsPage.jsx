import { useMemo, useState } from 'react';
import '../../../components/reusable/css/crmReusable.css';
import '../css/classesSectionsPage.css';
import { classesSectionsPageMock } from '../../../data/mocks/classesSections/classesSectionsPage.mock';
import { DashboardIcons } from '../../../components/common/js/dashboardIcons';
import StatusPill from '../../../components/common/js/statusPill';
import {
  PageHeader,
  CrmButton,
  DataTableCard,
  EntityFormModal,
  FormSelect,
  useModal,
} from '../../../components/reusable/js/index';

const ClassesSectionsPage = () => {
  const {
    title,
    subtitle,
    classesPanel,
    sectionsPanel,
    addClassModal,
    addSectionModal,
    classes,
    sectionsByClass,
  } = classesSectionsPageMock;

  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id ?? '');
  const { isOpen: isClassModalOpen, openModal: openClassModal, closeModal: closeClassModal } = useModal();
  const { isOpen: isSectionModalOpen, openModal: openSectionModal, closeModal: closeSectionModal } = useModal();

  const classOptions = useMemo(
    () => classes.map((item) => ({ label: item.name, value: item.id })),
    [classes],
  );

  const sections = sectionsByClass[selectedClassId] ?? [];
  const selectedClass = classes.find((item) => item.id === selectedClassId);

  return (
    <div className="crmListPage classesSectionsPage">
      <PageHeader title={title} subtitle={subtitle} />

      <div className="classesSectionsLayout crmSectionAnimate crmSectionDelay1">
        <section className="classesSectionsPanel">
          <header className="classesSectionsPanelHeader">
            <h2 className="classesSectionsPanelTitle">{classesPanel.title}</h2>
            <CrmButton variant="primary" type="button" onClick={openClassModal} aria-label={classesPanel.addAriaLabel}>
              {DashboardIcons.plus(16)}
              {classesPanel.addLabel}
            </CrmButton>
          </header>

          <DataTableCard>
            <table className="crmTable">
              <thead>
                <tr>
                  {classesPanel.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {classes.length === 0 && (
                  <tr>
                    <td colSpan={4} className="classesSectionsEmpty">
                      {classesPanel.emptyMessage}
                    </td>
                  </tr>
                )}
                {classes.map((classItem) => (
                  <tr
                    key={classItem.id}
                    className={`crmTableRow classesSectionsClassRow${selectedClassId === classItem.id ? ' classesSectionsClassRowActive' : ''}${classItem.isDeactivated ? ' classesSectionsRowInactive' : ''}`}
                  >
                    <td>
                      <button
                        type="button"
                        className="classesSectionsClassSelectBtn"
                        onClick={() => setSelectedClassId(classItem.id)}
                      >
                        {classItem.name}
                      </button>
                    </td>
                    <td>{classItem.displayOrder}</td>
                    <td>
                      <StatusPill status={classItem.status} />
                    </td>
                    <td>
                      <div className="crmRowActions">
                        <button
                          type="button"
                          className="crmActionBtn crmActionBtnDark"
                          aria-label={`Edit ${classItem.name}`}
                        >
                          {DashboardIcons.edit(16)}
                        </button>
                        {!classItem.isDeactivated && (
                          <button
                            type="button"
                            className="crmActionBtn crmActionBtnDanger"
                            aria-label={`Deactivate ${classItem.name}`}
                          >
                            {DashboardIcons.trash(16)}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTableCard>
        </section>

        <section className="classesSectionsPanel">
          <header className="classesSectionsPanelHeader">
            <h2 className="classesSectionsPanelTitle">{sectionsPanel.title}</h2>
            <CrmButton
              variant="primary"
              type="button"
              onClick={openSectionModal}
              disabled={!selectedClassId}
              aria-label={sectionsPanel.addAriaLabel}
            >
              {DashboardIcons.plus(16)}
              {sectionsPanel.addLabel}
            </CrmButton>
          </header>

          <div className="classesSectionsClassFilter">
            <FormSelect
              ariaLabel={sectionsPanel.classSelectAriaLabel}
              options={classOptions}
              value={selectedClassId}
              onChange={(event) => setSelectedClassId(event.target.value)}
              variant="filter"
              placeholder={sectionsPanel.classSelectPlaceholder}
            />
          </div>

          {!selectedClassId ? (
            <p className="classesSectionsHint">{sectionsPanel.selectClassHint}</p>
          ) : (
            <DataTableCard>
              <p className="classesSectionsSubheading">
                Sections for
                {' '}
                <strong>{selectedClass?.name}</strong>
              </p>
              <table className="crmTable">
                <thead>
                  <tr>
                    {sectionsPanel.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sections.length === 0 && (
                    <tr>
                      <td colSpan={3} className="classesSectionsEmpty">
                        {sectionsPanel.emptyMessage}
                      </td>
                    </tr>
                  )}
                  {sections.map((section) => (
                    <tr
                      key={section.id}
                      className={`crmTableRow${section.isDeactivated ? ' classesSectionsRowInactive' : ''}`}
                    >
                      <td className="classesSectionsSectionName">{section.name}</td>
                      <td>
                        <StatusPill status={section.status} />
                      </td>
                      <td>
                        <div className="crmRowActions">
                          <button
                            type="button"
                            className="crmActionBtn crmActionBtnDark"
                            aria-label={`Edit section ${section.name}`}
                          >
                            {DashboardIcons.edit(16)}
                          </button>
                          {!section.isDeactivated && (
                            <button
                              type="button"
                              className="crmActionBtn crmActionBtnDanger"
                              aria-label={`Deactivate section ${section.name}`}
                            >
                              {DashboardIcons.trash(16)}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataTableCard>
          )}
        </section>
      </div>

      <EntityFormModal
        isOpen={isClassModalOpen}
        onClose={closeClassModal}
        modalData={addClassModal}
      />

      <EntityFormModal
        isOpen={isSectionModalOpen}
        onClose={closeSectionModal}
        modalData={addSectionModal}
      />
    </div>
  );
};

export default ClassesSectionsPage;
