package com.c209.ticket.domain.ticket.repository;


import com.c209.ticket.domain.ticket.dto.TicketDto;
import com.c209.ticket.domain.ticket.dto.TicketPaymentsDto;
import com.c209.ticket.domain.ticket.entity.Ticket;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TicketRepository extends ReactiveCrudRepository<Ticket, Long> {

    @Query("SELECT ticket_id, schedule_id, NULL , row, col FROM ticket WHERE owner_id= :ownerId and is_used=0 and status='예매완료'")
    Flux<TicketDto> findAllNotUsedTicketByOwnerId(Long ownerId);

    @Query("SELECT ticket_id, schedule_id,'', row, col FROM ticket WHERE ticket_id= :ticketId ")
    Mono<TicketDto> findByTicketDtoId(Long ticketId);

    Mono<Ticket> findByTicketId(Long ticketId);

    @Query("SELECT ticket_id, imp_uid, schedule_id,status, pay_due_date FROM ticket WHERE owner_id= :ownerId ")
    Flux<TicketPaymentsDto> findAllTicketPayments(Long ownerId);
}
