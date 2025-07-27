import { memo, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ContactCard, Loader, ErrorMessage } from "src/components";
import { RootState } from "src/redux/reducers";
import { ContactDto } from "src/types/dto";

export const FavoritListPage = memo(() => {
  const {
    items: contactsState,
    loading,
    error,
  } = useSelector((state: RootState) => state.contacts);
  const { items: favoriteContactsState } = useSelector(
    (state: RootState) => state.favorites
  );

  const [contacts, setContacts] = useState<ContactDto[]>([]);

  useEffect(() => {
    setContacts(
      contactsState.filter(({ id }) => favoriteContactsState.includes(id))
    );
  }, [contactsState, favoriteContactsState]);

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
    <Row xxl={4} className="g-4">
      {contacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
