import { FC } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import { ContactCard, Empty, Loader, ErrorMessage } from "src/components";
import { contactsStore } from "src/stores";

export const ContactPage: FC = observer(() => {
  const { contactId } = useParams<{ contactId: string }>();

  const { contacts, isLoading, error } = contactsStore;
  const contact = contacts.find(({ id }) => id === contactId);

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

  return (
    <Row xxl={3}>
      <Col className={"mx-auto"}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
});
