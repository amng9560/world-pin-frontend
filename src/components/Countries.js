import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import CountryContainer from './CountryContainer'
import AddPlan from './AddPlan'

const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item});
    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
  
    destClone.splice(droppableDestination.index, 0, removed);
  
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
  
    return result;
};


export default class Countries extends Component {
    state = {
        makePlans: []
    }

    onDragEnd = result => {
        const { source, destination } = result;

        if (!destination) {
          return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index){
            return;
        }

        switch (source.droppableId) {
          case 'countries':
            this.setState({
                [destination.droppableId]: copy(
                    this.props.countries,
                    this.state[destination.droppableId],
                    source,
                    destination
                )
            });
            break;
          default:
            this.setState(
                move(
                    this.state.makePlans,
                    this.props[destination.droppableId],
                    source,
                    destination
                )
            );
            break;
        }
    };

    submitState = () => {
        this.setState({
            makePlans: []
        })
    }

    createOriginDraggable = (item, index) => {
        return <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
          {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                style={provided.draggableProps.style}
                className="plans__container__list"
              > 
                <div
                    {...provided.dragHandleProps}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                        />
                    </svg>
                </div>
                {item.name}
              </div>
          )}
        </Draggable>
      }

    render() {
        const { countries, countriesPerPage, totalCountries, paginate, updateSearchTerm, searchTerm } = this.props
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="country">
                    <CountryContainer 
                        countries={countries} 
                        countriesPerPage={countriesPerPage} 
                        totalCountries={totalCountries} 
                        paginate={paginate} 
                        updateSearchTerm={updateSearchTerm} 
                        searchTerm={searchTerm}
                    />
                    {Object.keys(this.state).map((plan, i) => (
                        <Droppable key={i} droppableId={plan}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    onDragOver={snapshot.onDragOver}
                                    className="plans"
                                >
                                    <AddPlan createPlan={this.props.createPlan} makePlans={this.state.makePlans} submitState={this.submitState}/>
                                    <div className="plans__container">
                                        <h3>Place Countries Here: </h3>
                                        {this.state[plan].map(this.createOriginDraggable)}
                                    </div>
                                {provided.placeholder}
                            </div>
                            )}
                            
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        )
    }
}
