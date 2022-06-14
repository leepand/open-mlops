"""``AbstractDataSet`` implementation to load/save data/model from/to a Pickle file."""

__all__ = ["PickleDataSet"]

from contextlib import suppress

with suppress(ImportError):
    from .pickle_dataset import PickleDataSet