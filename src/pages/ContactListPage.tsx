import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import {
  FilterForm,
  FilterFormValues,
  ContactCard,
  Loader,
  ErrorMessage,
} from "src/components";
import { contactsStore, groupsStore } from "src/stores";

import { ContactDto } from "src/types/dto";

export const ContactListPage = observer(() => {
  const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>([]);
  const { contacts, isLoading, error } = contactsStore;

  useEffect(() => {
    contactsStore.fetchContacts();
    groupsStore.fetchGroups();
  }, []);

  useEffect(() => {
    if (contacts.length) {
      setFilteredContacts(contacts);
    }
  }, [contacts]);

  const onSubmit = (fv: Partial<FilterFormValues>): void => {
    let findContacts: ContactDto[] = contacts;

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({ name }) =>
        name.toLowerCase().includes(fvName)
      );
    }

    if (fv.groupId) {
      const groupContacts = groupsStore.groups.find(
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

  if (isLoading || groupsStore.isLoading) {
    return <Loader />;
  }

  if (error || groupsStore.error) {
    return (
      <ErrorMessage
        message="Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже."
        logError={String(contactsStore.error || groupsStore.error)}
      />
    );
  }

  if (!contacts.length) {
    return <div>Контакты не найдены.</div>;
  }

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm
          groupContactsList={groupsStore.groups}
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
