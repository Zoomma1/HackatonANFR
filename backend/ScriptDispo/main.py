import pandas as pd

requests = pd.read_csv('requests.csv', delimiter=';', encoding='ISO-8859-1')
available_freqs = pd.read_csv('available_freqs.csv', delimiter=';', encoding='ISO-8859-1')

requests['Attributed Frequency (Tx)'] = pd.to_numeric(requests['Attributed Frequency (Tx)'], errors='coerce')
available_freqs['FrÃ©quence Min (MHz)'] = pd.to_numeric(available_freqs['FrÃ©quence Min (MHz)'], errors='coerce')
available_freqs['FrÃ©quence Max (MHz)'] = pd.to_numeric(available_freqs['FrÃ©quence Max (MHz)'], errors='coerce')

def generateCsv():
    results = []

    for i, request in requests.iterrows():

        available = available_freqs[(available_freqs['FrÃ©quence Min (MHz)'] <= request['Attributed Frequency (Tx)']) & (available_freqs['FrÃ©quence Max (MHz)'] >= request['Attributed Frequency (Tx)'])]

        if not available.empty:
            results.append('Available')
        else:
            results.append('Not Available')

    requests['Availability'] = results

    requests.to_csv('results.csv', index=False)
    return


def check_frequency_availability(start_date, end_date, service, usage_type, venue, rx_freq, tx_freq, duplex):
    available = available_freqs[
        (available_freqs['Service'] == service) &
        (available_freqs['Usage Type'] == usage_type) &
        (available_freqs['Venue'] == venue) &
        (available_freqs['Duplex'] == duplex) &
        (available_freqs['Start Date'] <= start_date) &
        (available_freqs['End Date'] >= end_date) &
        (available_freqs['Fréquence Min (MHz)'] <= rx_freq) &
        (available_freqs['Fréquence Max (MHz)'] >= tx_freq)
    ]

    requested = requests[
        (requests['Service'] == service) &
        (requests['Usage Type'] == usage_type) &
        (requests['Venue'] == venue) &
        (requests['Duplex'] == duplex) &
        (requests['Start Date'] <= start_date) &
        (requests['End Date'] >= end_date) &
        (requests['Fréquence Min (MHz)'] <= rx_freq) &
        (requests['Fréquence Max (MHz)'] >= tx_freq)
    ]

    if not available.empty and requested.empty:
        return True
    else:
        return False