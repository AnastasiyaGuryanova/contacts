import { memo, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ContactDto, GroupContactsDto } from "src/types/dto";
import {
  GroupContactsCard,
  Loader,
  Empty,
  ContactCard,
  ErrorMessage,
} from "src/components";
import { RootState } from "src/redux/reducers";

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();

  const {
    items: groupContactsState,
    loading,
    error,
  } = useSelector((state: RootState) => state.groups);
  const { items: contactsState } = useSelector(
    (state: RootState) => state.contacts
  );

  const [contacts, setContacts] = useState<ContactDto[]>([]);
  const [groupContacts, setGroupContacts] = useState<
    GroupContactsDto | undefined
  >(undefined);

  useEffect(() => {
    const findGroup = groupContactsState.find(({ id }) => id === groupId);
    setGroupContacts(findGroup);
    setContacts(
      findGroup
        ? contactsState.filter(({ id }) => findGroup.contactIds.includes(id))
        : []
    );
  }, [groupId, groupContactsState, contactsState]);

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

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContacts} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {contacts.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});
