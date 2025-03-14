FROM timberio/vector:0.34.0-debian

COPY vector.toml /etc/vector/vector.toml

EXPOSE 8686
EXPOSE 9598

CMD ["--config", "/etc/vector/vector.toml"] 