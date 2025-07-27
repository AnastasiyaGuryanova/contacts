import { memo, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  FilterForm,
  FilterFormValues,
  ContactCard,
  Loader,
  ErrorMessage,
} from "src/components";
import { RootState } from "src/redux/reducers";
import { useSelector } from "react-redux";

export const ContactListPage = memo(() => {
  const {
    items: contactsState,
    loading,
    error,
  } = useSelector((state: RootState) => state.contacts);
  const { items: groupContactsState } = useSelector(
    (state: RootState) => state.groups
  );

  const [filteredContacts, setFilteredContacts] = useState(contactsState);

  useEffect(() => {
    setFilteredContacts(contactsState);
  }, [contactsState]);

  const onSubmit = (fv: Partial<FilterFormValues>): void => {
    let findContacts = contactsState;

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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже."
        logError={error}
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
          {filteredContacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
