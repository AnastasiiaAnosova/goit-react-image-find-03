import { Component } from "react";
import { SearchbarHeader, SearchForm, SearchFormButton, SearchFormInput, SearchFormIcon } from "../Searchbar/Searchbar.styled";


class Searchbar extends Component {
    state = {
        searchQuery: ''
    }

    handleChange = ({ target: { value } }) => {
        this.setState({
            searchQuery: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.submit(this.state.searchQuery);
        this.setState({ searchQuery: '' });
    }

    render() {
        return (
            <SearchbarHeader>
                <SearchForm onClick={this.handleSubmit}>
                    <SearchFormButton type="submit">
                        <SearchFormIcon />
                    </SearchFormButton>

                    <SearchFormInput
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                    />
                </SearchForm>
            </SearchbarHeader>
        );
    }

}

export default Searchbar