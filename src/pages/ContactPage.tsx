import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactCard, Empty, Loader, ErrorMessage } from "src/components";
import { useGetContactsQuery } from "src/redux/contacts";

export const ContactPage: FC = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const { data: contacts = [], isLoading, error } = useGetContactsQuery();

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
};
