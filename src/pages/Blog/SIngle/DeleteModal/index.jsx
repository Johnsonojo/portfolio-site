import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import blogAPI from "../../../../redux/api/blogAPI";
import "./style.scss";

const DeleteArticleModal = (props) => {
  const navigate = useNavigate();

  const mutation = useMutation(blogAPI.deleteArticle, {
    onSuccess: (response) => {
      if (!response.error) {
        toast.success(response?.message);
        setTimeout(() => {
          navigate("/blog");
        }, 1000);
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const onHandleDelete = () => {
    mutation.mutate(props.slug);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div>
          <h3>Sure you want to delete this article?</h3>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="action-button-wrapper1">
          <Button variant="success" onClick={onHandleDelete}>
            Yes
          </Button>
          <Button variant="danger" onClick={props.onHide}>
            No
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteArticleModal;
