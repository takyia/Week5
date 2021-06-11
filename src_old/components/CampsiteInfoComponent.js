import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Button, 
    Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from "react-animation-components";

    function RenderCampsite({campsite}) {
        return (
          <div className="col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>

            <Card>
              <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
              <CardImgOverlay>
                <CardTitle> {campsite.description} </CardTitle>
              </CardImgOverlay>
            </Card>
            </FadeTransform>
          </div>
        );
    }

    function RenderComments({comments, postComment, campsiteId}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                <Stagger in>
                {
                    comments.map(comment => {
                        return (
                            <Fade in key={comment.id}>
                                <div>
                                    <p>
                                        {comment.text}<br />
                                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </p>
                                </div>
                            </Fade>
                        );
                    })
                }
                </Stagger>
                <CommentForm postComment={postComment} campsiteId={campsiteId}/>
            </div>
        );
    }
    return <div />;
}


    function CampsiteInfo(props) {

        if(props.isLoading) {
            return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
        }

        if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

        if(props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem> <Link to = "/directory">Directory</Link> </BreadcrumbItem>
                            <BreadcrumbItem active> {props.campsite.name} </BreadcrumbItem>
                        </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row"> 
                        <RenderCampsite campsite = {props.campsite} />
                        <RenderComments 
                        comments = {props.comments} 
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                        />
                    </div>
                </div>
            );
        } 
        return <div />;

    }

    class CommentForm extends Component {
        constructor(props) {
          super(props);

          this.state = {
            isModalOpen: false
          };

          this.toggleModal = this.toggleModal.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState ({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            this.props.postComment (this.props.campsiteId, values.rating, values.author, values.text);
            this.toggleModal();
        }

       
      render() {
          
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>

                <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
                    <ModalHeader toggle = {this.toggleModal}> Submit Comment </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit = {values => this.handleSubmit(values)}>
                        <div className = "form-group">
                            <Label htmlFor = "rating" md={2}>Rating</Label>
                            
                                <Control.Select
                                    model = ".rating"
                                    id = "rating"
                                    name="rating"
                                    placeholder="Rating"
                                    className="form-control"
                                    >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.Select>
                                
                            
                        </div>
                        <div className="form-group">
                            <Label htmlFor="author" md={2}>Name</Label>
                            
                                <Control.Text
                                    model=".author"
                                    id="author"
                                    name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    />
                                
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="text" md={2}>Comment</label>
                            
                                <Control.Textarea
                                    model=".text"
                                    id="text"
                                    name="text"
                                    placeholder="Comment"
                                    className="form-control"
                                    rows="6"
                                />
                            </div>
                        
                        <Button type="submit" color="primary" > 
                            Submit
                        </Button>
                    </LocalForm>

                </ModalBody>
                </Modal>


            



            </div>
        );
    }

}




export default CampsiteInfo;