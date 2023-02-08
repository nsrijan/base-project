import UsersList from "../../views/users";
import GenericService from "../../service/GenericService";

const index = ({ users }) => {
  return <UsersList users={users} />;
};

export default index;

export async function getStaticProps() {
  const users = await GenericService.getAll("customers");

  return {
    props: {
      users,
    },
  };
}
