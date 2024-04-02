package com.c209.ticket.domain.ticket.repository.sync;

import com.c209.ticket.domain.ticket.entity.TicketSync;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TicketSyncRepository  extends JpaRepository<TicketSync, Long> {
    @Query("SELECT t FROM TicketSync t WHERE t.ticketId= :ticketId ")
    Optional<TicketSync> findByTicketId(Long ticketId);

    List<TicketSync> findByBuyerIdAndImpUid(Long buyerId, String impUid);

    @Query("SELECT t FROM TicketSync t WHERE t.scheduleId = :scheduleId AND t.status = '환불대기' ORDER BY FUNCTION('RAND')")
    List<TicketSync> findRandomRefundPendingTicketsByScheduleId(@Param("scheduleId") Long scheduleId);
}
