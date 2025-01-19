import { memo, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  FilterForm,
  FilterFormValues,
  ContactCard,
  Loader,
  ErrorMessage,
} from "src/components";
import { useGetContactsQuery } from "src/redux/contacts";
import { useGetGroupsQuery } from "src/redux/groups";

import { ContactDto } from "src/types/dto";

export const ContactListPage = memo(() => {
  const { data: contactsState = [], isLoading, error } = useGetContactsQuery();
  const { data: groupContactsState = [] } = useGetGroupsQuery();

  const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>([]);

  useEffect(() => {
    if (contactsState.length) {
      setFilteredContacts(contactsState);
    }
  }, [contactsState]);

  const onSubmit = (fv: Partial<FilterFormValues>): void => {
    let findContacts: ContactDto[] = contactsState;

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({ name }) =>
        name.toLowerCase().includes(fvName)
      );
    }

    if (fv.groupId) {
      const groupContacts = groupContactsState.find(
        ({ id }) => id === fv.groupId
      );

      if (groupContacts) {
        findContacts = findContacts.filter(({ id }) =>
          groupContacts.contactIds.includes(id)
        );
      }
    }

    setFilteredContacts(findContacts);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже."
        logError={String(error)}
      />
    );
  }

  if (!contactsState.length) {
    return <div>Контакты не найдены.</div>;
  }

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm
          groupContactsList={groupContactsState}
          initialValues={{}}
          onSubmit={onSubmit}
        />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {filteredContacts.map((contact: ContactDto) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
