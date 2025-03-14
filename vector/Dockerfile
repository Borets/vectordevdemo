FROM timberio/vector:0.34.0-debian

WORKDIR /etc/vector

COPY vector.toml ./vector.toml

# Expose ports for API and metrics
EXPOSE 8686
EXPOSE 9598

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8686/health || exit 1

# Set environment variables
ENV VECTOR_CONFIG=/etc/vector/vector.toml
ENV VECTOR_WATCH_CONFIG=true

ENTRYPOINT ["/usr/bin/vector"] 