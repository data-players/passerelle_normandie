import React from 'react';
import { ChipField, SingleFieldList } from 'react-admin';
import { Column, ColumnShowLayout, Hero, Show} from '@semapps/archipelago-layout';
import { ReferenceArrayField } from '@semapps/semantic-data-provider';

const ProjectTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const SectorShow = props => (
  <Show  title={<ProjectTitle />} {...props}>
    <ColumnShowLayout>
      <Column xs={12} sm={6}>
        <Hero>
          <ReferenceArrayField label="Projets" reference="Interest" source="pair:sectorOf">
            <SingleFieldList linkType="show">
                <ChipField source="pair:label" color="secondary" />
            </SingleFieldList>
          </ReferenceArrayField>
        </Hero>
      </Column>
    </ColumnShowLayout>
  </Show>
);

export default SectorShow;
