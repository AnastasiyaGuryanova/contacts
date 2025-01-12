import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { GroupContactsCard, Loader, ErrorMessage } from "src/components";
import { RootState } from "src/redux/reducers";

export const GroupListPage = () => {
  const {
    items: groupContactsState,
    loading,
    error,
  } = useSelector((state: RootState) => state.groups);

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
    <Row xxl={4}>
      {groupContactsState.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
};
