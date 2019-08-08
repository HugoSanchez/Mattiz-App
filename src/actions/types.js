
    //  AUTH ACTIONS  //
export const SET_TOKEN                      = 'set_token';
export const SET_USER                       = 'set_user';
export const LOGOUT_USER                    = 'logout_user';

    // PLAID ACTIONS // 
export const LOAD_PLAID_INFO                = 'load_plaid_info'
export const SET_BALANCE                    = 'set_balance';
export const SET_TRANSACTIONS               = 'set_transactions';

    // ETH TX ACTIONS // 
export const SEND_TX                        = 'send_tx';
export const SET_AMOUNT                     = 'set_amount';
export const SET_ADDRESS                    = 'set_address';
export const SET_LOADING                    = 'set_loading';
export const SET_CONFIRMED                  = 'set_confirmed';
export const RESET_ETH_TX_STATE             = 'reset_state';
export const SET_ETH_RENDER_FORM            = 'set_eth_render_form';
export const SET_REMAINING_BALANCE          = 'set_remaining_balance';
export const SET_AMOUNT_IN_DOLLARS          = 'set_amount_in_dollars';
export const INITIATE_SET_AMOUNT            = 'initiate_set_amount';

    // COMMON ETH ACTIONS // 
export const SET_ETH_ADDRESS                = 'set_eth_address';
export const GET_ETH_BALANCES               = 'get_eth_balances';
export const SET_ETH_BALANCES               = 'set_eth_balances';
export const SET_ETH_TRANSACTIONS           = 'set_eth_transactions';
export const SET_ETH_BALANCES_IN_DOLLARS    = 'set_eth_balance_in_dollars';

    // MARKET DATA ACTIONS // 
export const GET_ETH_MARKET_DATA            = 'get_eth_market_data';
export const GET_BTC_MARKET_DATA            = 'get_btc_market_data';
export const SET_GAS_PRICE                  = 'set_gas_price';
export const SET_CURRENT_ETH_PRICE          = 'set_current_eth_price';
export const SET_ETH_PRICE_HISTORY          = 'set_eth_price_history';
export const SET_ETH_PERCENTAGE             = 'set_eth_percentage'
;
export const SET_CURRENT_BTC_PRICE          = 'set_current_btc_price';
export const SET_BTC_PRICE_HISTORY          = 'set_btc_price_history';
export const SET_BTC_PERCENTAGE             = 'set_btc_percentage';

    // TIMEFRAME ACTIONS //
export const SET_TIMEFRAME                  = 'set_timeframe';

    // DASHBOARD SELECTOR ACTIONS // 
export const SET_DASHBOARD                  = 'set_dashboard';
