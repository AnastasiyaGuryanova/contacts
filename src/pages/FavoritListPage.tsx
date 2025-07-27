import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ContactCard, Loader, ErrorMessage } from "src/components";
import { useGetContactsQuery } from "src/redux/contacts";
import { RootState } from "src/redux/store";

export const FavoritListPage = memo(() => {
  const { isLoading, error } = useGetContactsQuery();

  const { items: favoriteContacts } = useSelector(
    (state: RootState) => state.favorites
  );

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

  if (!favoriteContacts.length) {
    return <div>Избранных контактов нет.</div>;
  }

  return (
    <Row xxl={4} className="g-4">
      {favoriteContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
