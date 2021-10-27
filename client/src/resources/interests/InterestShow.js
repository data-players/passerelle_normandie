import React from 'react';
import { SingleFieldList } from 'react-admin';
import { ColumnShowLayout, Show, AvatarField } from '@semapps/archipelago-layout';
import { ReferenceArrayField,  } from '@semapps/semantic-data-provider';

const InterestTitle = ({ record }) => {
  return <span>{record ? record['pair:label'] : ''}</span>;
};

const InterestShow = props => (
  <Show title={<InterestTitle />} {...props}>
    <ColumnShowLayout>
      <ReferenceArrayField perPage={5} reference="Person" source="pair:topicOf" filter={{type: "pair:Person"}} >
                <SingleFieldList linkType="show" >
                  <AvatarField label={record => `${record['pair:firstName']} ${record['pair:lastName']}`} image="image" classes={{
                    parent: {
                      width: '100px',
                      margin : '10px'
                    }
                  }}/>
                </SingleFieldList>
              </ReferenceArrayField>
        
    </ColumnShowLayout>
  </Show>
);

export default InterestShow;
