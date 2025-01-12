import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ContactCard, Empty, Loader, ErrorMessage } from "src/components";
import { RootState } from "src/redux/reducers";

export const ContactPage: FC = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const {
    items: contactsState,
    loading,
    error,
  } = useSelector((state: RootState) => state.contacts);

  const contact = contactsState.find(({ id }) => id === contactId);

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
    <Row xxl={3}>
      <Col className={"mx-auto"}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
