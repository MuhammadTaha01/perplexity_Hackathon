from dependency_injector import containers, providers

from app.chat.application.service.perplexity import PerplexityService


class Container(containers.DeclarativeContainer):
    perplexity_service = providers.Factory(
        PerplexityService,
    )
