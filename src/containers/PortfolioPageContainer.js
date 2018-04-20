import { connect } from 'react-redux'
import PortfolioPage from 'pages/PortfolioPage'

const mapStateToProps = (state) => ({
  wallets: state.portfolio.wallets,
  transactions: state.portfolio.transactions
})

export default connect(mapStateToProps)(PortfolioPage)
