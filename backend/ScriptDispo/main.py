import pandas as pd
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

os.chdir(script_dir)

requests = pd.read_csv('requests.csv', delimiter=';', encoding='ISO-8859-1')
available_freqs = pd.read_csv('available_freqs.csv', delimiter=';', encoding='ISO-8859-1')

requests['Attributed Frequency (Tx)'] = pd.to_numeric(requests['Attributed Frequency (Tx)'], errors='coerce')
available_freqs['Frequence Min (MHz)'] = pd.to_numeric(available_freqs['Frequence Min (MHz)'], errors='coerce')
available_freqs['Frequence Max (MHz)'] = pd.to_numeric(available_freqs['Frequence Max (MHz)'], errors='coerce')

def generateCsv():
    results = []

    for i, request in requests.iterrows():

        available = available_freqs[
            (available_freqs['Frequence Min (MHz)'] <= request['Attributed Frequency (Tx)']) &
            (available_freqs['Frequence Max (MHz)'] >= request['Attributed Frequency (Tx)']) &
            ((available_freqs['Debut'] < request['Debut'] < available_freqs['Fin']) |
             (available_freqs['Debut'] < request['Fin'] < available_freqs['Fin']))
        ]

        if not available.empty:
            results.append('Not Available')
        else:
            results.append('Available')

    requests['Availability'] = results

    requests.to_csv('results.csv', index=False)
    return


def check_frequency_availability(start_date, end_date, service, usage_type, venue, rx_freq, tx_freq, duplex):
    available = requests[
        (available_freqs['Service'] == service) &
        (available_freqs['Localisation'] == venue) &
        (available_freqs['Frequence Min (MHz)'] <= rx_freq) &
        (available_freqs['Frequence Max (MHz)'] >= tx_freq)
    ]

    requested = requests[
        (requests['Spectrum Service'] == service) &
        (requests['Usage Type'] == usage_type) &
        (requests['Venue'] == venue) &
        (requests['Duplex'] == duplex) &
        (requests['Debut'] <= start_date) &
        (requests['Fin'] >= end_date) &
        (requests['Attributed Frequency (Tx)'] <= rx_freq) &
        (requests['Attributed Frequency (Rx)'] >= tx_freq)
    ]

    if requested.empty:
        return True
    else:
        return False