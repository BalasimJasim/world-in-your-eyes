import { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/AuthContext";
import { deletePlace } from "../../shared/api/places-api";
import "./PlaceItems.css";

const PlaceItems = (props) => {
    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const confirmDeleteHandler = async () => {
        try {
            console.log('Deleting place with ID:', props.id);
            await deletePlace(props.id);
            console.log("Place deleted successfully!");
            setShowConfirmModal(false);
            props.onDeletePlace(props.id); 
        } catch (error) {
            console.error("Error deleting place:", error);
        }
    };

    return (
        <>
            <Modal
                show={showMap}
                onCancel={() => setShowMap(false)}
                header={props.title}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={() => setShowMap(false)}>Close</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={() => setShowConfirmModal(false)}
                header="Are you sure?"
                footer={
                    <>
                        <Button inverse onClick={() => setShowConfirmModal(false)}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </>
                }
            >
                <p>Do you want to proceed and delete this place?</p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={() => setShowMap(true)}>View on Map</Button>
                        {auth.isLoggedIn && (
                            <>
                                <Button to={`/places/${props.id}`}>Edit</Button>
                                <Button danger onClick={() => setShowConfirmModal(true)}>Delete</Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItems;
