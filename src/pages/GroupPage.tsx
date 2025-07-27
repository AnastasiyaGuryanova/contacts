import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  GroupContactsCard,
  Loader,
  Empty,
  ContactCard,
  ErrorMessage,
} from "src/components";
import { useGetGroupsQuery } from "src/redux/groups";
import { useGetContactsQuery } from "src/redux/contacts";

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();

  const {
    data: groups = [],
    isLoading: groupsLoading,
    error: groupsError,
  } = useGetGroupsQuery();
  const {
    data: contacts = [],
    isLoading: contactsLoading,
    error: contactsError,
  } = useGetContactsQuery();

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
