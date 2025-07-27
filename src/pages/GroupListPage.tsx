import { Col, Row } from "react-bootstrap";
import { GroupContactsCard, Loader, ErrorMessage } from "src/components";
import { useGetGroupsQuery } from "src/redux/groups";

export const GroupListPage = () => {
  const {
    data: groupContactsState = [],
    isLoading,
    error,
  } = useGetGroupsQuery();

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
    <Row xxl={4}>
      {groupContactsState.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
};
