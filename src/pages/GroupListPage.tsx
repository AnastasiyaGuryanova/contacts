import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { GroupContactsCard, Loader, ErrorMessage } from "src/components";
import { groupsStore } from "src/stores";

export const GroupListPage = observer(() => {
  const { groups, isLoading, error } = groupsStore;

  useEffect(() => {
    groupsStore.fetchGroups();
  }, []);

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

  if (!groups.length) {
    return <div>Группы не найдены.</div>;
  }

  return (
    <Row xxl={4}>
      {groups.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
