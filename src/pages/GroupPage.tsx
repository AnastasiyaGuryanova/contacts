import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  GroupContactsCard,
  Loader,
  Empty,
  ContactCard,
  ErrorMessage,
} from "src/components";
import { contactsStore, groupsStore } from "src/stores";

export const GroupPage = observer(() => {
  const { groupId } = useParams<{ groupId: string }>();

  useEffect(() => {
    groupsStore.fetchGroups();
    contactsStore.fetchContacts();
  }, []);

  const { groups, isLoading: groupsLoading, error: groupsError } = groupsStore;
  const {
    contacts,
    isLoading: contactsLoading,
    error: contactsError,
  } = contactsStore;

  const group = groups.find(({ id }) => id === groupId);
  const groupContacts = group
    ? contacts.filter(({ id }) => group.contactIds.includes(id))
    : [];

  if (groupsLoading || contactsLoading) {
    return <Loader />;
  }

  if (groupsError || contactsError) {
    return (
      <ErrorMessage
        message="Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже."
        logError={String(groupsError || contactsError)}
      />
    );
  }

  if (!group) {
    return <Empty />;
  }

  return (
    <Row className="g-4">
      <Col xxl={12}>
        <Row xxl={3}>
          <Col className="mx-auto">
            <GroupContactsCard groupContacts={group} />
          </Col>
        </Row>
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {groupContacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
