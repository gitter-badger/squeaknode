import logging
import threading

from squeaknode.network.peer_client import PeerClient

logger = logging.getLogger(__name__)


class PeerConnection:
    def __init__(self, peer, squeak_server_client):
        self.peer = peer
        self.peer_client = PeerClient(
            self.peer.host,
            self.peer.port,
            squeak_server_client,
        )
        self._stop_event = threading.Event()

    def stop(self):
        self._stop_event.set()

    def stopped(self):
        return self._stop_event.is_set()
