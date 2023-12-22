import { Component } from "react";
import { fetchImagesWithQuery } from '../services/api';
import Loader from '../Loader/Loader';
import Searchbar from "components/Searchbar/Searchbar";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Button from "components/Button/Button";

class App extends Component {

  state = {
    images: null,
    searchQuery: '',
    isLoading: false,
    page: 1,
    error: null,
    showLoadMore: false,
    showModal: false,
  }

  handleSetSearchQuery = (searchQuery) => {
    this.setState({
      searchQuery,
      images: null,
      page: 1,
      showLoadeMore: false
    });
  }

  componentDidUpdate(_, prevState) {
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) this.fetchImages();
  }

  fetchImages = async () => {
    const { searchQuery, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await fetchImagesWithQuery(searchQuery, page);
      console.log("images-hits after query:", hits);
      if (hits.length === 12) {
        page === 1 && Notify.success(`Hooray! We found ${totalHits} images.`, {
          timeout: 6000,
        },);
      } else if (hits.length < 12) {
        Notify.warning(`Hm! We found only ${hits.length} images.`, {
          timeout: 6000,
        },);
      } else {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
          timeout: 6000,
        },);
      }
      this.setState((prev) => ({
        images: prev.images ? [...prev.images, ...hits] : hits,
        showLoadMore: page < Math.ceil(totalHits / 12),
      }))
    } catch (error) {
      this.setState({ error });
      Notify.failure('Sorry, some error occurred. Please try again.', {
        timeout: 6000,
      },);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleLoadNextImages = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  }

  render() {
    const { isLoading, showLoadMore } = this.state;
    return (
      <>
        <Searchbar submit={this.handleSetSearchQuery} />
        {isLoading && <Loader />}
        {showLoadMore && <Button loadMoreClick={this.handleLoadNextImages} />}
      </>
    );
  }
}

export default App