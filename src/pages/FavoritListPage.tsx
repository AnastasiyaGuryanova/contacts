import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { ContactCard, Loader, ErrorMessage } from "src/components";
import { contactsStore, favoritesStore } from "src/stores";

export const FavoritListPage = observer(() => {
  const { isLoading, error } = contactsStore;
  const { favorites, updateFavorites } = favoritesStore;

  useEffect(() => {
    contactsStore.fetchContacts();
    favoritesStore.updateFavorites();
  }, [updateFavorites]);

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

  if (!favorites.length) {
    return <div>Избранных контактов нет.</div>;
  }

  return (
    <Row xxl={4} className="g-4">
      {favorites.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
